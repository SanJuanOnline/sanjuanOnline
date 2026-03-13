import React from 'react';
import NegocioDetalle from '../../../src/paginas/NegocioDetalle';

interface Props {
  params: { slug: string };
}

export default function Page({ params }: Props) {
  return <NegocioDetalle slug={params.slug} />;
}
