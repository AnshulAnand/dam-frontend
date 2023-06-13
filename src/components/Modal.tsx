export default function Modal({
  children,
  showModal,
  onCloseModal,
}: {
  children: any
  showModal: boolean
  onCloseModal: any
}) {
  if (!showModal) return null

  return (
    <div className='modal'>
      <div className='modal-container'>
        <div>{children}</div>
        <button className='close-btn' onClick={() => onCloseModal(false)}>
          Close
        </button>
      </div>
    </div>
  )
}
