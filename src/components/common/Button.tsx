// Button.tsx

import clsx from 'clsx';

// Button 컴포넌트의 props 타입 정의
type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary'; // 버튼 스타일 종류
  size?: 'sm' | 'md' | 'lg'; // 버튼 크기
  isLoading?: boolean; // 로딩 상태
} & React.ComponentPropsWithoutRef<'button'>; // 기본 button 속성들 포함

// Button 컴포넌트 정의
const Button = ({
  // Button 컴포넌트의 props (디폴트 값 포함)
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  ...rest // 나머지 button 속성들 (onClick, disabled 등)
}: ButtonProps) => {
  const baseStyles = 'font-bold py-2 px-4 rounded transition-colors flex items-center justify-center';

  const variantStyles = {
    //primary와 secondary 스타일 정의 -> 와이어프레임 나오면 수정해야 할 것 같습니다.
    primary: 'bg-yellow-400 hover:bg-blue-700 text-black',
    secondary: 'bg-yellow-200 hover:bg-gray-700 text-black',
  };

  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const finalClassName = clsx(
    // 클래스네임 조합(base, variant, size, 로딩 상태, 추가 클래스네임)
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    isLoading && 'opacity-50 cursor-not-allowed', 
    rest.className
  );

  return (
    <button {...rest} className={finalClassName} disabled={isLoading || rest.disabled}>
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

export default Button;