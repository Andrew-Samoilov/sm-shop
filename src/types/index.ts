import { Prisma } from "@prisma/client";

export type TyreWithRelations = Prisma.TyreGetPayload<{
    include: { brand: true; model: true }
}>;

export interface Benefit {
  id: number
  title: string
}

export interface Feature {
  id: number
  number: string
  header: string
  subHeader: string
}

export type Block = { markdown: string }

export interface ContactLink {
  id: number
  text: string
  url: string
}
export interface ContactBlock {
  id: number
  name: string
  link: ContactLink[]
}

export interface Certificate {
  id: number
  text: string
  url: string
  brand: string
  year: number
  width: number
  height: number
}
