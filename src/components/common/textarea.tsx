import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  forwardRef,
  ChangeEvent,
} from "react";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> {
  /** 최소 보이는 줄 수(높이 기준). 기본값 1 */
  minRows?: number;
  /** 최대 보이는 줄 수(높이 상한). 지정하지 않으면 제한 없음 */
  maxRows?: number;
}

/**
 * 내용 길이에 따라 자동으로 높이가 변하는 Textarea.
 * 높이는 minRows ~ maxRows 범위 안에서만 늘어나거나 줄어듭니다.
 */
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(function Textarea(
  { minRows = 1, 
    maxRows, 
    onChange, 
    className = "w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500", 
    ...props },
  ref
) {
  const innerRef = useRef<HTMLTextAreaElement | null>(null);

  // 전달받은 ref를 실제 DOM 노드로 연결
  React.useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);

  const resize = useCallback(() => {
    const el = innerRef.current;
    if (!el) return;

    const computed = window.getComputedStyle(el);
    const lineHeight = parseFloat(computed.lineHeight || "0");
    const paddingY =
      parseFloat(computed.paddingTop || "0") +
      parseFloat(computed.paddingBottom || "0");
    const borderY =
      parseFloat(computed.borderTopWidth || "0") +
      parseFloat(computed.borderBottomWidth || "0");

    const min = Math.max(1, Math.floor(minRows));
    const max =
      typeof maxRows === "number" && maxRows > 0
        ? Math.max(min, Math.floor(maxRows))
        : Number.POSITIVE_INFINITY;

    const minHeight = min * lineHeight + paddingY + borderY;
    const maxHeight =
      max === Number.POSITIVE_INFINITY
        ? Number.POSITIVE_INFINITY
        : max * lineHeight + paddingY + borderY;

    // scrollHeight를 정확히 측정하기 위해 높이를 초기화
    el.style.height = "auto";

    const natural = el.scrollHeight;
    const nextHeight = Math.min(
      Math.max(natural, minHeight),
      maxHeight
    );

    el.style.height = `${nextHeight}px`;
    el.style.overflowY = natural > maxHeight ? "auto" : "hidden";
  }, [minRows, maxRows]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    // 입력 변경 직후 내용에 맞게 즉시 리사이즈
    resize();
  };

  // 마운트 시, 그리고 외부에서 value가 변경될 때마다 리사이즈
  useLayoutEffect(() => {
    resize();
  }, [resize, props.value]);

  return (
    <textarea
      {...props}
      ref={innerRef}
      rows={minRows}
      onChange={handleChange}
      className={`resize-none overflow-hidden ${className ?? ""}`}
    />
  );
});

export default Textarea;
