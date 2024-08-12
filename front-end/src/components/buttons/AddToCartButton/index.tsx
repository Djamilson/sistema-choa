import FlyingButton from 'react-flying-item'

type IAddToCartButtonProps = {
  onClick: () => void
  urlImage: string
}

export default function AddToCartButton({
  onClick,
  urlImage,
}: IAddToCartButtonProps) {
  return (
    <div className="flying-button-parent mt-4">
      <FlyingButton targetTop={'5%'} targetLeft={'95%'} src={urlImage}>
        <div onClick={onClick}>Add to cart</div>
      </FlyingButton>
    </div>
  )
}
