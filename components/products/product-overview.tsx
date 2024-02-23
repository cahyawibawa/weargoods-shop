'use client'

import { Tab } from '@headlessui/react'
import classNames from 'classnames'
import { AddToCart } from 'components/layout/navbar/cart-button/add-to-cart'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
  product: swell.Product & { categories: swell.Category[] }
}
type OptionType = {
  optionName: string
  selectedValue: string
}

export default function ProductOverview({ product }: Props) {
  const [chosenOptions, setChosenOptions] = useState<OptionType[]>([])

  const handleOptionChange = (optionName: string, selectedValue: string) => {
    const updatedOptions = chosenOptions.map((option) =>
      option.optionName === optionName ? { ...option, selectedValue } : option
    )
    setChosenOptions(updatedOptions)
  }
  return (
    <>
      <div className="lg:mb-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        {product.images && (
          <Tab.Group as="div" className="flex flex-col-reverse">
            <div className="mx-auto mt-6 w-full px-6 sm:px-0">
              <Tab.List className="grid grid-cols-4 gap-6">
                {product.images.map((image, index) => (
                  <Tab
                    key={image.id}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-foreground hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only">{`Image index: ${index}`}</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <Image
                            src={image.file?.url as string}
                            alt={image.caption || ''}
                            className="h-full w-full bg-gray-200 object-cover object-center"
                            width={image.file?.width}
                            height={image.file?.height}
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? 'ring-foreground' : 'ring-transparent',
                            'pointer-events-none absolute inset-0 rounded-md ring-0 ring-offset-1'
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-6 w-full">
              {product.images.map((image) => (
                <Tab.Panel key={image.id}>
                  <Image
                    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                    src={image.file?.url!}
                    alt={image.caption || ''}
                    className="min-h-fit bg-gray-200 object-cover object-center sm:rounded-lg"
                    width={image.file?.width}
                    height={image.file?.height}
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        )}

        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {product.name}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>

            <p className="text-3xl tracking-tight text-foreground">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
              }).format(product.price || 0)}
            </p>
          </div>

          {product.description && (
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div
                className="inherit-font-family space-y-6 text-base text-muted-foreground"
                // rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
          {/* Render Product Options */}
          {/* {product.options && (
            <div className="mt-6">
              {product.options.map((option) => (
                <div key={option.name}>
                  <p className="text-sm font-medium text-foreground">
                    {option.name}
                  </p>
                  <div className="mt-1 flex space-x-4">
                    {option.values?.map((value) => (
                      <button
                        key={value.name}
                        className={classNames(
                          "px-2 py-2 text-xs font-medium uppercase border border-input rounded-sm",
                          {
                            "bg-gray-900 text-muted-foreground":
                              chosenOptions.some(
                                (opt) =>
                                  opt.optionName === option.name &&
                                  opt.selectedValue === value.name
                              ),
                            "hover:border-foreground": true,
                          }
                        )}
                      >
                        {value.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )} */}

          <AddToCart product={product} />
        </div>
      </div>
    </>
  )
}
