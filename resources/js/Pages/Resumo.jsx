import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head } from '@inertiajs/react';

export default function Resumo() {
    return (
        <MenuSuperior>
            <Head title="Resumo" />

            <div className="pr-3 pl-3 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Resumo
                        </div>
                    </div>
                </div>
            </div>
        </MenuSuperior>
    );
}
