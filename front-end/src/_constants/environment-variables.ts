import packageJson from '../../package.json'

const { version } = packageJson

const uri: { [key: string]: string } = {
  development: `http://${process.env.NEXT_PUBLIC_LOCALHOST}:${process.env.NEXT_PUBLIC_PORT}`,
  production: `https://${process.env.NEXT_PUBLIC_WEBHOST}`,
  test: 'https://',
}

const NEXT_PUBLIC_NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV!

const NEXT_PUBLIC_MERCADO_PAGO_DEV_PUBLIC =
  process.env.NEXT_PUBLIC_MERCADO_PAGO_DEV_PUBLIC!
const NEXT_PUBLIC_MERCADO_PAGO_DEV_KEY =
  process.env.NEXT_PUBLIC_MERCADO_PAGO_DEV_KEY!

const NEXT_PUBLIC_MERCADO_PAGO_PRODUCT_PUBLIC =
  process.env.NEXT_PUBLIC_MERCADO_PAGO_PRODUCT_PUBLIC!
const NEXT_PUBLIC_MERCADO_PAGO_PRODUCT_KEY =
  process.env.NEXT_PUBLIC_MERCADO_PAGO_PRODUCT_KEY!

export {
  NEXT_PUBLIC_MERCADO_PAGO_DEV_KEY,
  NEXT_PUBLIC_MERCADO_PAGO_DEV_PUBLIC,
  NEXT_PUBLIC_MERCADO_PAGO_PRODUCT_KEY,
  NEXT_PUBLIC_MERCADO_PAGO_PRODUCT_PUBLIC,
  NEXT_PUBLIC_NODE_ENV,
  uri,
  version
}

