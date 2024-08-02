// components/withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent:any) => {
    const AuthenticatedComponent = (props:any) => {
        const router = useRouter();

        useEffect(() => {
            const token = Cookies.get('token'); 

            if (!token) {
                router.push('/');
            }
        }, [router]);
        return <WrappedComponent {...props} />;
    };

    // Set the display name for debugging
    AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return AuthenticatedComponent;
};

export default withAuth;