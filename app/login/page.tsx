'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { COLORS } from '@/assets/colors';
import styles from './LoginPage.module.css';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      alert('Por favor, preencha email e senha.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    setLoading(false);

    if (error) {
      switch (error.message) {
        case 'Invalid login credentials':
          alert('Email ou senha inválidos.');
          break;
        default:
          alert('Erro ao fazer login: ' + error.message);
      }
    } else {
      localStorage.setItem('user_session', JSON.stringify(data.session));
      router.push('/dashboard');
    }
  };

  // estilizar variáveis CSS dinâmicas
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

  // Funções de navegação para as outras páginas
  const goToForgotPassword = () => router.push('/forgot-password');
  const goToSignup = () => router.push('/signup');

  return (
    <div className={styles.container} style={cssVars}>
      <div className={styles.containerLogo}>
        <Image
          src="/images/logo.png"
          alt="Logo do app"
          width={120}
          height={120}
          className={styles.logo}
          priority
        />
      </div>

      <form onSubmit={handleLogin} className={styles.formWrapper}>
        <div className={styles.separator}>
          <div className={styles.separatorLine}></div>
          <div className={styles.separatorLine}></div>
        </div>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.separator}>
          <div className={styles.separatorLine}></div>
          <div className={styles.separatorLine}></div>
        </div>


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

        <div
          className={styles.forgotPassword}
          onClick={goToForgotPassword}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') goToForgotPassword();
          }}
        >
          Esqueceu sua senha?
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <div className={styles.separator}>
          <div className={styles.separatorLine}></div>
          OU
          <div className={styles.separatorLine}></div>
        </div>

        <div className={styles.signupWrapper}>
          Não tem uma conta?
          <span
            className={styles.signupLink}
            onClick={goToSignup}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') goToSignup();
            }}
          >
            Cadastre-se
          </span>
        </div>
      </form>
    </div>
  );
}
