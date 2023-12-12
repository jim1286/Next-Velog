"use client";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useModal } from "./hook";
import { Modal } from "@/components";
import Tab from "./components/Tab";
import SignInModalBody from "./components/SignInModalBody";
import SignInModalFooter from "./components/SignInModalFooter";
import SignUpModalBody from "./components/SignUpModalBody";
import SignUpModalFooter from "./components/SignUpModalFooter";

export default function PostLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  const { isSignInOpen, isSignUpOpen, handleOpenSignIn, handleCloseSignIn, handleSignIn, handleOpenSignUp, handleCloseSignUp, handleSingUp } = useModal();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(e.target.value);
  };

  return (
    <div className="w-screen h-screen px-40 overflow-auto">
      <div>
        <div className="flex text-2xl text-slate-950 p-5 justify-between">
          Belog
          <button onClick={handleOpenSignIn} className="rounded-3xl text-base bg-black text-teal-50 p-2 w-20 text-center">
            로그인
          </button>
        </div>
        <div className="flex">
          <Tab tabRoute="trend" href="/post/trend/week" title="트렌딩" />
          <Tab tabRoute="recent" href="/post/recent" title="최신" />
          {pathName.includes("trend") && (
            <select
              id="trends"
              defaultValue="week"
              className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
              onChange={handleChange}
            >
              <option value="today">오늘</option>
              <option value="week">이번 주</option>
              <option value="month">이번 달</option>
              <option value="year">올해</option>
            </select>
          )}
        </div>
      </div>
      {children}
      <Modal
        open={isSignInOpen}
        title={<div className="text-xl text-slate-950">로그인</div>}
        body={<SignInModalBody onLogin={handleSignIn} />}
        footer={<SignInModalFooter openSignUp={handleOpenSignUp} />}
        activeCloseButton
        onClose={handleCloseSignIn}
      />
      <Modal
        open={isSignUpOpen}
        title={<div className="text-xl text-slate-950">회원가입</div>}
        body={<SignUpModalBody onSignUp={handleSingUp} />}
        footer={<SignUpModalFooter openSignIn={handleOpenSignIn} />}
        activeCloseButton
        onClose={handleCloseSignIn}
      />
    </div>
  );
}
