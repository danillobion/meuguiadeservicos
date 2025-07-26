export default function AbasPagina({ cabecalho }) {
  return (
    <>
      <nav aria-label="Breadcrumb">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-gray-200">
            {cabecalho.map((item, index) => {
              return item.active ? (
                <li key={index} className="me-2">
                  <a href={item.href} aria-current="page" className="inline-block p-4 text-blue-600 bg-blue-200 hover:bg-blue-300 rounded-t-lg active">{item.label}</a>
                </li>
              ) : (
                <li key={index} className="me-2">
                  <a href={item.href} className="inline-block p-4 rounded-t-lg bg-gray-50 hover:text-gray-600 hover:bg-gray-50">{item.label}</a>
                </li>
              )
            })}
          </ul>
      </nav>
    </>
  );
}
