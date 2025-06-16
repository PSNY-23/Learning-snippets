// app/login/page.tsx

"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { account } from "@/appwrite/appwrite";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    // your login logic here
   try {
    setLoading(true);
    setError("");
    await account.createEmailPasswordSession(email, password);
    router.replace("/dashboard")
   } catch (error:any) {
    setError(error.message)
   } finally {
    setLoading(false);
   }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#edf1f5] to-white px-4'>
      <Card className='w-full max-w-md shadow-xl rounded-2xl p-6'>
        <CardHeader className='text-center space-y-2'>
          <h2 className='text-2xl font-bold'>Welcome Back 👋</h2>
          <p className='text-sm text-muted-foreground'>Login to your account</p>
          <p className="text-sm text-red-400">{error}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='space-y-1'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='chuttu@baua.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Don&apos;t have an account? </span>
              <Link href="/register" className='underline text-muted-foreground cursor-pointer' >Register</Link>
            </p>
            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? "Loging..." : "Login"}
            </Button>
          </form>

          <div className='relative py-4'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase text-muted-foreground'>
              <span className='bg-white px-2'>Or</span>
            </div>
          </div>

          <Button
            variant='outline'
            className='w-full flex items-center gap-2'
            disabled={loading}
            onClick={() => console.log("Google Signin")}
          >
            <FcGoogle size={16} />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
