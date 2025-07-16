
// type Migalha = {
//   href: string;
//   label: string;
// };

// type Props = {
//   cabecalho: {
//     titulo: string;
//     migalhas: Migalha[];
//   };
// };

export default function CabecalhoPagina({ cabecalho }) {
  const { titulo, migalhas } = cabecalho;

  return (
    <div className="mt-10 mb-6">
      <h1 className="text-4xl font-bold text-gray-900">{titulo}</h1>

      <nav aria-label="Breadcrumb">
        <ol className="flex gap-1 text-sm text-gray-500 mt-2">
          {migalhas.map((item, index) => {
            const isLast = index === migalhas.length - 1;
            return (
              <li key={item.href} className="flex items-center">
                {item.href !== "#" ? (
                //   <Link
                //     href={item.href}
                //     className={`hover:underline ${isLast ? "font-medium text-gray-700" : ""}`}
                //     aria-current={isLast ? "page" : undefined}
                //   >
                //     {item.label}
                //   </Link>
                    <a href={item.href} className="hover:underline">{item.label}</a>
                ) : (
                  <span className="text-gray-400">{item.label}</span>
                )}

                {!isLast && <span className="mx-1 text-gray-400">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
