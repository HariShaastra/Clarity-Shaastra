import React from 'react';
import { motion } from 'motion/react';
import { Layout, Button, Card } from '../components/UI';
import { Logo } from '../components/Logo';
import { LogIn, ShieldCheck, CloudIcon } from 'lucide-react';
import { loginWithGoogle } from '../lib/firebase';

interface LoginProps {
  onLoginSuccess: () => void;
  onSkip: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSkip }) => {
  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      onLoginSuccess();
    } catch (err) {
      // Error handled in firebase lib
    }
  };

  return (
    <Layout title="Clarity Shaastra">
      <div className="flex-1 flex flex-col items-center justify-center gap-8 py-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-4"
        >
          <Logo className="w-20 h-20 mx-auto" />
          <h2 className="text-3xl font-bold text-ink">Welcome</h2>
          <p className="text-secondary-warm max-w-xs mx-auto">
            Sync your reflections securely or continue locally on this device.
          </p>
        </motion.div>

        <Card className="w-full space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-secondary-warm bg-secondary-warm/5 p-3 rounded-2xl">
              <ShieldCheck size={20} className="text-accent-calm" />
              <span>Your data is encrypted and private.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-secondary-warm bg-secondary-warm/5 p-3 rounded-2xl">
              <CloudIcon size={20} className="text-primary-warm" />
              <span>Access your clarity history anywhere.</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              Continue with Google
            </Button>
            
            <button 
              onClick={onSkip}
              className="w-full py-3 text-sm font-bold text-secondary-warm/60 hover:text-ink transition-colors uppercase tracking-widest"
            >
              Continue Offline
            </button>
          </div>
        </Card>

        <p className="text-[10px] text-secondary-warm font-bold uppercase tracking-widest text-center px-4">
          By continuing, you agree to store your data on our secure cloud.
        </p>
      </div>
    </Layout>
  );
};
