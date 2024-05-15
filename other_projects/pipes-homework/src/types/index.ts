export type Server = {
  instanceType: string,
  name: string,
  status: string,
  started: Date
}

export type sortArg<T> = keyof T | `-${string & keyof T}`
