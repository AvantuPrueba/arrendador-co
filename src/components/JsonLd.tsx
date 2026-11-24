type JsonLdPrimitive = string | number | boolean | null;
type JsonLdValue =
  | JsonLdPrimitive
  | readonly JsonLdValue[]
  | { readonly [key: string]: JsonLdValue };

function serializeJsonLd(value: JsonLdValue): string {
  return JSON.stringify(value).replace(/[<>&]/g, (character) => {
    if (character === '<') return '\\u003c';
    if (character === '>') return '\\u003e';
    return '\\u0026';
  });
}

export default function JsonLd({ data }: { data: JsonLdValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
