'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { COLORS } from '@/assets/colors';
import styles from './SignupPage.module.css';
import Image from 'next/image';

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !senha || !confirmSenha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== confirmSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email,
            password: senha,
        });

        setLoading(false);

        if (error) {
            alert('Erro ao cadastrar: ' + error.message);
        } else {
            alert('Cadastro realizado! Verifique seu e-mail para ativar a conta.');
            router.push('/login');
        }
    };

    const handleBack = () => {
        router.push('/login');
    };

    const cssVars = {
        '--primary': COLORS.primary,
        '--primaryShadow': COLORS.primaryShadow,
        '--secundary': COLORS.secundary,
        '--terciary': COLORS.terciary,
        '--background': COLORS.background,
        '--primaryDark': COLORS.primaryDark,
        '--accentSeccundary': COLORS.accentSeccundary,
        '--gray': COLORS.gray,
        '--black': COLORS.black,
    } as React.CSSProperties;

    return (
        <div className={styles.container} style={cssVars}>
            <form onSubmit={handleSignup} className={styles.formWrapper}>

                <Image
                    src="/images/logo.png"
                    alt="Logo do app"
                    width={120}
                    height={120}
                    className={styles.logo}
                    priority
                />

                <h2 className={styles.title}>Cadastre-se</h2>


                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                    disabled={loading}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className={styles.input}
                    required
                    disabled={loading}
                />

                <input
                    type="password"
                    placeholder="Confirme a senha"
                    value={confirmSenha}
                    onChange={(e) => setConfirmSenha(e.target.value)}
                    className={styles.input}
                    required
                    disabled={loading}
                />

                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>

                <button
                    type="button"
                    onClick={handleBack}
                    className={styles.button}
                    disabled={loading}
                    style={{ marginTop: '1rem', backgroundColor: 'gray' }}
                >
                    Voltar
                </button>
            </form>
        </div>
    );
}
