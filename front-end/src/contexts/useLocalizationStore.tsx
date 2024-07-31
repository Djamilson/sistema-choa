import { IAddress } from '@/@model/address/address'
import { ISearchAddress } from '@/@model/address/searchAddress'
import { AppError } from '@/_services/errors/AppError'
import cep from 'cep-promise'
import { deleteCookie, setCookie } from 'cookies-next'
import { create } from 'zustand'
import { nextLocaled } from './nextLocaled'

type ICEP = {
  zipCode: string
}

type IActionsProps = {
  getLocalization: (cep: ICEP) => Promise<ISearchAddress>
  setLocalizationEdit: (data: IAddress) => void
  clearLocalization: () => void
}

type IStoreProps = {
  state: { location: ISearchAddress }
  actions: IActionsProps
}

export const useLocalizationStore = create<IStoreProps>((set) => ({
  state: {
    location: {} as ISearchAddress,
  },
  actions: {
    getLocalization: async ({ zipCode }: ICEP) => {
      try {
        const resData = await cep(zipCode, {
          timeout: 5000,
          providers: ['brasilapi'],
        })

        const location = resData as unknown as ISearchAddress

        set(() => {
          return {
            state: {
              location,
            },
          }
        })

        setCookie(nextLocaled.localizationShooferta, String(location), {
          maxAge: 60 * 60 * 24 * 7, // 30 days
          path: '/',
          sameSite: true,
          secure: true,
        })
        return location
      } catch (err) {
        console.log('eroioioi', err)
        throw new AppError(err)
      }
    },
    setLocalizationEdit: async ({
      zip_code,
      city,
      state,
      street,
      neighborhood,
    }: IAddress) => {
      const location = {
        cep: zip_code,
        city,
        neighborhood,
        service: 'edit',
        state,
        street,
      }

      set(() => {
        return {
          state: {
            location,
          },
        }
      })

      setCookie(nextLocaled.localizationShooferta, String(location), {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
        sameSite: true,
        secure: true,
      })
      return location
    },
    clearLocalization: async () => {
      try {
        set(() => {
          return {
            state: {
              location: {} as ISearchAddress,
            },
          }
        })

        deleteCookie(nextLocaled.localizationShooferta)
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode)
      }
    },
  },
}))
