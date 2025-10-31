<<<<<<< HEAD
// Button.tsx

import clsx from 'clsx';
=======
import clsx from "clsx";
>>>>>>> 6df9e74df77dd9610bd3bf4d1c3f0a15b3da9572

// Button 컴포넌트의 props 타입 정의
type ButtonProps = {
  children: React.ReactNode;
<<<<<<< HEAD
  variant?: 'primary' | 'secondary'; // 버튼 스타일 종류
  size?: 'sm' | 'md' | 'lg'; // 버튼 크기
  isLoading?: boolean; // 로딩 상태
  className?: string; // 추가적인 클래스네임(승찬이형 pr 반영)
} & React.ComponentPropsWithoutRef<'button'>; // 기본 button 속성들 포함
=======
  variant?:
    | "primary"
    | "secondary"
    | "third"
    | "navbar"
    | "ghost"
    | "trialStart";
  size?: "sm" | "md" | "lg"; // 버튼 크기
  isLoading?: boolean; // 로딩 상태
  className?: string; // 추가적인 클래스네임(승찬이형 pr 반영)
} & React.ComponentPropsWithoutRef<"button">; // 기본 button 속성들 포함
>>>>>>> 6df9e74df77dd9610bd3bf4d1c3f0a15b3da9572

// Button 컴포넌트 정의
const Button = ({
  // Button 컴포넌트의 props (디폴트 값 포함)
  children,
<<<<<<< HEAD
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '', // className prop의 기본값 설정
  ...rest // 나머지 button 속성들 (onClick, disabled 등)
}: ButtonProps) => {

  const baseStyles = 'transition-colors flex items-center justify-center'; // 공통 스타일만 남김
=======
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "", // className prop의 기본값 설정
  ...rest // 나머지 button 속성들 (onClick, disabled 등)
}: ButtonProps) => {
  const baseStyles =
    "transition-colors flex items-center justify-center text-center font-[Pretendard]"; // 공통 스타일만 남김
>>>>>>> 6df9e74df77dd9610bd3bf4d1c3f0a15b3da9572

  const variantStyles = {
    // primary와 secondary 스타일 정의 -> 와이어프레임 나오면 그거에 맞게 색상 수정해야 할 것 같습니다.
    // primary와 secondary에 패딩, 폰트 굵기, 둥근 모서리 스타일 포함 (승찬이형 pr 반영)
<<<<<<< HEAD
    primary: 'bg-yellow-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded',
    secondary: 'bg-yellow-200 hover:bg-gray-700 text-black font-medium py-1 px-3 rounded-lg',
  };

  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
=======
    // ghost 스타일 추가

    primary:
      "bg-yellow-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded", // 🔹 기본 버튼 (예: 공통 테스트용)

    // 솔로모드 버튼
    secondary:
      "bg-[#809AD2] text-white text-[36px] font-normal rounded-[15px] hover:opacity-90 leading-none whitespace-nowrap", // FirstTrialStart 솔로모드 버튼

    // VS모드 버튼
    third:
      "bg-[#EB9292] text-white text-[36px] font-normal rounded-[15px] hover:opacity-90 leading-none whitespace-nowrap", // FirstTrialStart VS모드 버튼

    // 재판 시작하기 버튼
    trialStart:
      "bg-[#203C77] text-white text-[36px] font-bold rounded-[15px] hover:opacity-90 leading-none whitespace-nowrap", // FirstTrialStart 재판 시작하기 버튼

      "bg-main hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
    // 첫번째 재판 (솔로모드, VS모드 버튼)
    secondary1:
      "bg-main-medium hover:opacity-80 text-white font-semibold text-[24px] rounded-[30px]",
    // Navbar의 LOGIN 버튼
    navbar:
      "box-border px-[37px] py-[10px] rounded-[33px] bg-[#FFFFFF] text-[#000000] font-[Pretendard] text-[20px] font-normal leading-normal hover:bg-gray-100", // Navbar 로그인 버튼

    ghost:
      "bg-transparent text-black hover:bg-gray-200 font-bold py-2 px-4 rounded",
  };

  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
>>>>>>> 6df9e74df77dd9610bd3bf4d1c3f0a15b3da9572
  };

  const finalClassName = clsx(
    // 클래스네임 조합(base, variant, size, 로딩 상태, 추가 클래스네임)
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
<<<<<<< HEAD
    isLoading && 'opacity-50 cursor-not-allowed', 
=======
    isLoading && "opacity-50 cursor-not-allowed",
>>>>>>> 6df9e74df77dd9610bd3bf4d1c3f0a15b3da9572
    className
  );

  return (
<<<<<<< HEAD
    <button {...rest} className={finalClassName} disabled={isLoading || rest.disabled}>
=======
    <button
      {...rest}
      className={finalClassName}
      disabled={isLoading || rest.disabled}
    >
>>>>>>> 6df9e74df77dd9610bd3bf4d1c3f0a15b3da9572
      {/* 로딩 중이면 스피너 또는 텍스트 표시, 아니면 원래 children 표시 */}
      {isLoading ? (
        <>
          {/* 간단한 로딩 스피너 예시 (Tailwind 애니메이션 사용) */}
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          처리 중...
        </>
      ) : (
        children
      )}
    </button>
  );
};

<<<<<<< HEAD
export default Button;
=======
export default Button;
>>>>>>> 6df9e74df77dd9610bd3bf4d1c3f0a15b3da9572
