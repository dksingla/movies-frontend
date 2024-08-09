// components/withAuth.tsx
import { useEffect } from 'react';
import { useRouter , usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent:any) => {
    const AuthenticatedComponent = (props:any) => {
        const router = useRouter();
        const pathname = usePathname();

        useEffect(() => {
            const token = Cookies.get('token'); 

            if (!token) {
                router.push('/');
            }else if (pathname === '/') {
                router.push('/movielist'); 
            }
        }, [router , pathname]);
        return <WrappedComponent {...props} />;
    };

    // Set the display name for debugging
    AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return AuthenticatedComponent;
};

export default withAuth;