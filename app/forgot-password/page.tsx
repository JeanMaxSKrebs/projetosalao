'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { COLORS } from '@/assets/colors';
import styles from './ForgotPasswordPage.module.css'; // estilo similar
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert('Por favor, preencha seu e-mail.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`, // redireciona após reset, pode ajustar
    });

    setLoading(false);

    if (error) {
      alert('Erro ao solicitar recuperação de senha: ' + error.message);
    } else {
      alert('Email de recuperação enviado! Verifique sua caixa de entrada.');
    }
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
      <form onSubmit={handleReset} className={styles.formWrapper}>
        <Image
          src="/images/logo.png"
          alt="Logo do app"
          width={120}
          height={120}
          className={styles.logo}
          priority
        />
        <h2 className={styles.title}>Recuperar Senha</h2>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
          disabled={loading}
        />

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar link de recuperação'}
        </button>
      </form>
    </div>
  );
}
