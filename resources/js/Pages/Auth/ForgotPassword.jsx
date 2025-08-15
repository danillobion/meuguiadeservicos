import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Esqueceu sua senha? Sem problema. Basta nos informar o seu endereço de e-mail e nós lhe enviaremos um link para redefinição de senha, que permitirá que você escolha uma nova.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    Link enviado para o seu e-mail. Caso não encontre, verifique sua caixa de spam.
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                {errors.email  && (
                    <div className="mt-2 text-sm text-red-600">
                        Aguarde um tempo para reenviar o link de redefinição de senha.
                    </div>
                )}
                {/* <InputError message={errors.email} className="mt-2" /> */}

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Enviar link para o e-mail
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
