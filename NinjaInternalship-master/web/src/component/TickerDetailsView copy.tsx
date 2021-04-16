import React from "react"
import { StoreContainer } from "../unstated/StoreContainer"
import { Modal, SIZE, ROLE, ModalHeader, ModalBody, ModalFooter, ModalButton } from "baseui/modal"
import Loader from "./loader"
import { Spinner } from "baseui/spinner"

interface Props {} 

function TickerDetailsView(props: Props) {
	const {} = props
	const { isViewModalOpen, setViewModalOpen, currentTicker, setCurrentTicker } = StoreContainer.useContainer()
	return (
		<Modal
			onClose={() => {
				setViewModalOpen(false)
				setCurrentTicker(undefined)
			}}
			closeable
			isOpen={isViewModalOpen}
			size={SIZE.default}
			role={ROLE.dialog}
		>
			<ModalHeader>More Details</ModalHeader>
			<ModalBody>
				  {currentTicker ? ( 
					<div>
						<h1>{currentTicker.id}</h1>
						<ul>
							<li>Name: {currentTicker.id}</li>
							<li>Ask: {currentTicker.ask}</li>
							<li>Price: {currentTicker.price}</li>
							<li>Bid: {currentTicker.bid}</li>
							<li>Volume: {currentTicker.volume}</li>
						</ul>
						<Loader />
					</div>
				) : (
					<div style={{ marginTop: "66px" }}>
						<Spinner color="#d5db70" />
					</div>
				) }
			</ModalBody>
			<ModalFooter>
				<ModalButton
					onClick={() => {
						setViewModalOpen(false)
						setCurrentTicker(undefined)
					}}
				>
					Cancel
				</ModalButton>
				<ModalButton>Okay</ModalButton>
			</ModalFooter>
		</Modal>
	)
}

export default TickerDetailsView
