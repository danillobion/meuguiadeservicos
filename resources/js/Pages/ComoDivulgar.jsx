import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head } from '@inertiajs/react';

export default function ComoDivulgar() {
    return (
        <MenuSuperior>
            <Head title="Como divulgar" />

            <div className="py-12 pr-3 pl-3 ">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Como divulgar
                        </div>
                    </div>
                </div>
            </div>
        </MenuSuperior>
    );
}
