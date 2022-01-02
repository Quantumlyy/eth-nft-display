// https://gist.github.com/strictlymomo/5a3c76ffa20c14212af9888cb78a01ac

async function init() {

    // ALETHIO API
    const MAINNET = {
        baseURL: "https://api.aleth.io/v1",
        contract: "0xd4e4078ca3495de5b1d4db434bebc5a986197782",
        logTopic: "0xa197d2acc8f19f456842a59ba3699aa028ad72b616fd9c26679a516e7443683e",
        pollInterval: 14000,
        pageLimit: 100,
    };
    const TESTNET = {
        baseURL: "https://api.goerli.aleth.io/v1",
        contract: "0xd0c3929fca326f3c7f38b0b5294d66fa2af95d9e",
        logTopic: "0xa197d2acc8f19f456842a59ba3699aa028ad72b616fd9c26679a516e7443683e",
        pollInterval: 10000,
        pageLimit: 32,
    };
    let network = TESTNET;
    let cursor = "";
    let url =`${network.baseURL}/contracts/${network.contract}/logEntries?filter[hasLogTopics.0]=${network.logTopic}&page[limit]=${network.pageLimit}`;

    // GLYPH EVENT LOGS
    let logs = [];
    let logData = "";
    let hex = "";
    const PREFIX = "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000010de646174613a746578742f706c61696e3b636861727365743d7574662d382c";
    let gridGlyph = [];
    let gridData = [];

    // VIZ PARAMS
    let grid;
    let gridDimension = 64;
    let cellSize = 10;
    let strokeWidth = 2;
    let colorScale = chroma.scale(['#fafa6e', '#2A4858']).mode('lch').colors(8);

    await getLogs();
    while (logs.length > 1) {
        await drawGlyphs();
    }
    setInterval(() => poll(), network.pollInterval);

    async function getLogs() {

        await fetch(url)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log("Got logs:", response.data);
                logs = response.data;
                logData = logs[logs.length - 1].attributes.logData;
                cursor = logs[logs.length - 1].attributes.cursor;

                gridGlyph = formatData();
                gridData = setGridData(gridGlyph);
                draw(gridData);
            });
    }

    async function drawGlyphs() {

        // console.log("currentCursor:", cursor);
        let url_cursor = `${network.baseURL}/contracts/${network.contract}/logEntries?filter[hasLogTopics.0]=${network.logTopic}&page[limit]=${network.pageLimit}&page[prev]=${cursor}`;

        await fetch(url_cursor)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                logs = response.data;
                // console.log("logs length:", logs.length);
                logData = logs[logs.length - 1].attributes.logData;
                cursor = logs[logs.length - 1].attributes.cursor;

                gridGlyph = formatData();
                gridData = setGridData(gridGlyph);
                draw(gridData);
            });
    }

    async function poll() {

        // console.log("currentCursor:", cursor);
        let url_cursor = `${network.baseURL}/contracts/${network.contract}/logEntries?filter[hasLogTopics.0]=${network.logTopic}&page[limit]=${network.pageLimit}&page[prev]=${cursor}`;

        await fetch(url_cursor)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response.data.length === 0) {
                    console.log("No updates");
                } else {
                    console.log("New glyph!");
                    logs = response.data;
                    logData = logs[logs.length - 1].attributes.logData;
                    cursor = logs[logs.length - 1].attributes.cursor;

                    gridGlyph = formatData();
                    gridData = setGridData(gridGlyph);
                    draw(gridData);
                }
            });
    }

    function formatData() {
        let hex = logData;
        let gridGlyph = (ethers.ethers.utils.toUtf8String("0x" + hex.substring(PREFIX.length, (hex.length - 4)))).split("%0A");
        gridGlyph.pop();
        return gridGlyph;
    }

    function setGridData(glyphData) {
        let data = new Array();
        let xpos = 0; // start xpos and ypos at 1 so the stroke will show when we make the grid
        let ypos = 0;
        let width = cellSize;
        let height = cellSize;

        for (let row = 0; row < glyphData.length; row++) {
            data.push(new Array());
            for (let column = 0; column < gridDimension; column++) {
                data[row].push({
                    x: xpos,
                    y: ypos,
                    width: width,
                    height: height,
                    character: glyphData[row][column]
                })
                xpos += width; // increment the x position. I.e. move it over by width
            }
            xpos = 1; // reset the x position after a row is complete
            ypos += height; // increment the y position for the next row. Move it down by height
        }
        return data;
    }

    function draw(gridData) {
        let grid = d3.select("#grid")
            .append("svg")
            .attr("width", `${cellSize * gridDimension/* + strokeWidth*/}`)
            .attr("height", `${cellSize * gridDimension/* + strokeWidth*/}`);

        let row = grid.selectAll(".row")
            .data(gridData)
            .enter().append("g")
            .attr("class", "row");

        let cells = row.selectAll(".cell")
            .data(d => d)
            .enter().append("g")
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .attr("class", d => setClass(d.character))
            .html(d => setGlyph(d.character, colorScale));
    }

    function setGlyph(char, colorScale) {
        switch (char) {
            case ("."):
                break;
            case ("O"):
                return `<circle stroke="${colorScale[0]}" stroke-width="${strokeWidth}" cx="${cellSize/2}" cy="${cellSize/2}" r="${cellSize/2}"></circle>`;
            case ("+"):
                return `<g>
                            <path d="M0,5 L10,5" stroke="${colorScale[1]}" stroke-width="${strokeWidth}"></path>
                            <path d="M5,0 L5,10" stroke="${colorScale[1]}" stroke-width="${strokeWidth}"></path>
                        </g>`;
            case ("X"):
                return `<g>
                            <path d="M10,0 L0,10" stroke="${colorScale[2]}" stroke-width="${strokeWidth}"></path>
                            <path d="M0,0 L10,10" stroke="${colorScale[2]}" stroke-width="${strokeWidth}"></path>
                        </g>`;
            case ("|"):
                return `<path d="M5,0 L5,10" stroke="${colorScale[3]}" stroke-width="${strokeWidth}"></path>`;
            case ("-"):
                return `<path d="M0,5 L10,5" stroke="${colorScale[4]}" stroke-width="${strokeWidth}"></path>`;
            case ("\\"):
                return `<path d="M0,0 L10,10" stroke="${colorScale[5]}" stroke-width="${strokeWidth}"></path>`;
            case ("/"):
                return `<path d="M10,0 L0,10" stroke="${colorScale[6]}" stroke-width="${strokeWidth}"></path>`;
            case ("#"):
                return `<rect fill="${colorScale[7]}" fill-rule="nonzero" x="0" y="0" width="${cellSize}" height="${cellSize}"></rect>`;
            default:
                break;
        }
    }

    function setClass(char) {
        switch (char) {
            case ("."): // 0x2E = .
                return "whitespace";
            case ("O"): // 0x4F = O
                return "circle";
            case ("+"): // 0x2B = +
                return "plus";
            case ("X"): // 0x58 = X
                return "x";
            case ("|"): // 0x7C = |
                return "vertical-line";
            case ("-"): // 0x2D = -
                return "horizontal-line";
            case ("\\"): // 0x5C = \
                return "back-slash";
            case ("/"): // 0x2F = /
                return "forward-slash";
            case ("#"): // 0x23 = #
                return "hash";
            default:
                break;
        }
    }

    function setFill(char, colorScale) {
        switch (char) {
            case ("."): // 0x2E = .
                return "transparent";
            case ("O"): // 0x4F = O
                return colorScale[0];
            case ("+"): // 0x2B = +
                return colorScale[1];
            case ("X"): // 0x58 = X
                return colorScale[2];
            case ("|"): // 0x7C = |
                return colorScale[3];
            case ("-"): // 0x2D = -
                return colorScale[4];
            case ("\\"): // 0x5C = \
                return colorScale[5];
            case ("/"): // 0x2F = /
                return colorScale[6];
            case ("#"): // 0x23 = #
                return colorScale[7];
            default:
                break;
        }
    }
}

init();

