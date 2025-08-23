export default function ApplicationLogo(props) {
    return (
        <>
            <div className="sm:hidden">
                <img {...props} 
                    src="/logo/logo_msg_3.svg" 
                    alt="Meu Guia de Serviços" 
                    />
            </div>
            <div className="sm:block hidden">
                <img {...props} 
                    src="/logo/logo_msg.svg" 
                    alt="Meu Guia de Serviços" 
                    />
            </div>
        </>
    );
}
