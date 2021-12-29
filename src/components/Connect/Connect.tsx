import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useEagerConnect from 'hooks/useEagerConnect';
import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectConnectingStatus, setConnectingStatus, setEagerAttempt } from 'state/reducers/user';
import MetamaskConnect from './MetamaskConnect';
import WalletConnectConnect from './WalletConnectConnect';

const Connect: React.FC = () => {
	const dispatch = useDispatch();
	const { active } = useActiveWeb3React();
	const triedToEagerConnect = useEagerConnect();
	const open = useSelector(selectConnectingStatus);

	const closeButtonRef = useRef(null);

	useEffect(() => {
		dispatch(setEagerAttempt(triedToEagerConnect));
		dispatch(setConnectingStatus(!active));
	}, [triedToEagerConnect, active, dispatch]);

	return (
		<>
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as="div"
					className="fixed min-h-screen z-40 inset-0 overflow-y-auto m-auto min-w-max"
					initialFocus={closeButtonRef}
					onClose={(state) => dispatch(setConnectingStatus(state))}
				>
					<div className="flex min-h-screen w-full">
						<div className="flex items-end justify-center m-auto text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Dialog.Overlay className="fixed inset-0" />
							</Transition.Child>
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<div className="z-50 inline-block rounded-md text-left overflow-hidden shadow-xl transform transition-all align-middle">
									<div className="dark:text-white dark:bg-gray-900 border dark:border-gray-700 border-transparent p-4">
										<div className="flex items-start">
											<div className="mt-0 text-left">
												<Dialog.Title as="span" className="w-full text-lg leading-6 font-bold">
													Connect a wallet
													<button
														type="button"
														className="float-right"
														onClick={() => dispatch(setConnectingStatus(false))}
														ref={closeButtonRef}
													>
														<FontAwesomeIcon icon={faTimes} />
													</button>
												</Dialog.Title>
												<div className="mt-2 px-8">
													<MetamaskConnect />
													<WalletConnectConnect />
												</div>
											</div>
										</div>
									</div>
								</div>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default Connect;
