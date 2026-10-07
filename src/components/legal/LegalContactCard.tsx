interface LegalContactCardProps {
  email: string;
  title?: string;
}

export default function LegalContactCard({ email, title = '¿Tienes alguna pregunta?' }: LegalContactCardProps) {
  return (
    <div className="rounded-2xl bg-slate-900 p-8 text-white">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <p className="mb-6 text-slate-300">
        Escríbenos y te responderemos lo antes posible.
      </p>
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700 transition-colors"
      >
        {email}
      </a>
    </div>
  );
}
