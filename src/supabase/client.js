import { createContext, useState } from 'react';
import { supabase } from '../supabase/client'; // Asegúrate de ajustar la extensión del archivo si es necesario

export const AuthContext = createContext({
    user: null,
    loginWithGoogle: async () => { },
    loginWithFacebook: async () => { },
    logout: async () => { },
});
