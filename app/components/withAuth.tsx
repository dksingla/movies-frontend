// components/withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent:any) => {
    const AuthenticatedComponent = (props:any) => {
        const router = useRouter();

        useEffect(() => {
            const token = Cookies.get('token'); // Check if the token exists

            if (!token) {
                // If no token, redirect to login page
                router.push('/');
            }
        }, [router]);

        // Render the wrapped component if authenticated
        return <WrappedComponent {...props} />;
    };

    // Set the display name for debugging
    AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return AuthenticatedComponent;
};

export default withAuth;