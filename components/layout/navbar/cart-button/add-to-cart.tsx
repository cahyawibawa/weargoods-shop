import { SizeGuide } from 'components/size-guide'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { useToast } from 'hooks/use-toast'
import { addToCart } from 'lib/swell/cart'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useSWRConfig } from 'swr'

type Props = {
  product: swell.Product & { categories: swell.Category[] }
}

export function AddToCart({ product }: Props) {
  const [chosenOptions, setChosenOptions] = useState({})
  const { mutate } = useSWRConfig()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(false)
  const isMutating = loading || isPending
  const { toast } = useToast()
  const [toastMessage, setToastMessage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [pleaseSelectAllOptions, setPleaseSelectAllOptions] = useState('')
  useEffect(() => {
    product.options?.length === Object.keys(chosenOptions).length
    product.options?.length === Object.keys(chosenOptions).length &&
      setPleaseSelectAllOptions('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(chosenOptions).length])
  useEffect(() => {
    if (!isMutating && toastMessage !== '') {
      toast({
        description: toastMessage,
      })
      setToastMessage('') // Clear the toast message
    }
  }, [isMutating, toast, toastMessage])
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    await addToCart({
      product_id: product.id,
      quantity: quantity,
      // options: Object.keys(chosenOptions).map((optionName) => ({
      //   name: optionName,
      //   value: chosenOptions[optionName],
      // })) as CartOption[],
    })

    setLoading(false)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    mutate('cart') // Mutate the "cart" key to update the cart data

    startTransition(() => {
      router.refresh() // Use replace() instead of refresh()
    })

    setToastMessage('Successfully added to cart')
  }
  return (
    <form className="mb-2" onSubmit={handleSubmit}>
      <div className="mt-4 flex flex-col sm:flex-row">
        {/* <div className="mr-4">
          <ProductOptions
            product={product}
            chosenOptions={chosenOptions}
            setChosenOptions={setChosenOptions}
          />
        </div> */}
        <div className="flex items-center">
          <Input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mr-2 w-20"
          />
        </div>

        {/* <div className="flex items-center ml-0 sm:ml-2 mt-4 sm:mt-0">
          <SizeGuide />
        </div> */}
      </div>

      <Button
        type="submit"
        className="mt-4 w-full max-w-xs hover:bg-opacity-90"
        disabled={isMutating}
      >
        {isMutating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          'Add to Cart'
        )}
      </Button>
    </form>
  )
}
