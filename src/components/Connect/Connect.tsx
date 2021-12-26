import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectConnectingStatus, setConnectingStatus } from 'state/reducers/user';

const Connect: React.FC = () => {
	const dispatch = useDispatch();
	const open = useSelector(selectConnectingStatus);

	const closeButtonRef = useRef(null);

	return (
		<>
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as="div"
					className="fixed min-h-screen z-40 inset-0 overflow-y-auto m-auto"
					initialFocus={closeButtonRef}
					onClose={(state) => dispatch(setConnectingStatus(state))}
				>
					<div className="flex min-h-screen">
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
								<div className="z-50 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
									<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
										<div className="sm:flex sm:items-start">
											<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
												<Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
													Connect a wallet
													<button type="button" onClick={() => dispatch(setConnectingStatus(false))} ref={closeButtonRef}>
														<FontAwesomeIcon icon={faTimes} />
													</button>
												</Dialog.Title>
												<div className="mt-2">
													<p className="text-sm text-gray-500">Tesr</p>
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
