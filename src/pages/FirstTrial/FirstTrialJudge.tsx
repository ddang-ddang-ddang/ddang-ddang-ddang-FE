import JudgeIcon from "@/assets/svgs/FirstJudge.svg";
import BubbleTail from "@/assets/svgs/BubbleTail.svg";
import Button from "@/components/common/Button";

export default function FirstTrialJudge() {
  return (
    <div className="flex flex-col items-center bg-[#FFFFFF] mx-auto w-full max-w-[1440px] min-h-screen pb-[100px]">
      {/* 제목 */}
      <h1
        className="text-[38px] font-bold text-[#203C77] text-center mt-[84px]"
        style={{ fontFamily: "Pretendard", lineHeight: "150%" }}
      >
        초심 최종 판결
      </h1>

      {/* 파란 박스 */}
      <div className="relative w-[995px] h-[634px] bg-[#6596DA] rounded-[30px] mt-[84px]">
        {/* A입장 / VS / B입장 */}
        <div className="flex justify-center items-center pt-[57px] gap-[82px]">
          <p
            className="text-white text-[38px] font-bold leading-[150%]"
            style={{ fontFamily: "Pretendard" }}
          >
            A입장
          </p>
          <p
            className="text-white text-[38px] font-bold leading-[150%]"
            style={{ fontFamily: "Pretendard" }}
          >
            VS
          </p>
          <p
            className="text-white text-[38px] font-bold leading-[150%]"
            style={{ fontFamily: "Pretendard" }}
          >
            B입장
          </p>
        </div>

        {/* 말풍선 */}
        <div className="absolute left-[57px] top-[162px]">
          <div className="relative">
            {/* 본체 */}
            <div className="w-[316px] h-[78px] bg-white rounded-[30px] shadow-sm flex justify-center items-center px-[55px] py-[21px]">
              <p
                className="text-[#000000] text-[24px] font-normal leading-[150%] text-center"
                style={{
                  fontFamily: "Pretendard",
                  fontWeight: 400,
                  fontStyle: "normal",
                }}
              >
                더 논리적이었던 건 A!
              </p>
            </div>

            {/* 꼬리 */}
            <BubbleTail className="absolute left-[43px] top-[44px] w-[76px] h-[78px] fill-white" />
          </div>
        </div>

        {/* 판사 이미지 */}
        <JudgeIcon className="absolute bottom-0 left-[30px] w-[410px] h-[385px]" />

        {/* 판결문 노란 상자 */}
        <div className="absolute top-[151px] right-[44px] w-[496px] h-[513px] bg-[#FFF6F6] rounded-[7px] flex flex-col items-center pt-[30px]">
          {/* 사건번호 */}
          <p
            className="absolute left-[39px] top-[29px] text-[#EBAD27] text-[14px] font-normal leading-[150%]"
            style={{ fontFamily: "Gapyeong Hanseokbong" }}
          >
            사건번호 - 01
          </p>

          {/* AI 판사 */}
          <p
            className="absolute right-[45px] top-[26px] text-[#EBAD27] text-[14px] font-normal leading-[150%] text-right"
            style={{ fontFamily: "Gapyeong Hanseokbong" }}
          >
            AI 판사
          </p>

          {/* 중앙 노란 원 이미지 */}
          <img
            src="/src/assets/judge.png"
            alt="판결문 장식"
            className="absolute top-[46px] left-1/2 -translate-x-1/2 w-[102px] h-[102px]"
          />

          {/* 판결문 타이틀 */}
          <h2
            className="absolute left-[193px] top-[78px] text-[#EBAD27] text-[38px] font-bold leading-[150%] text-center"
            style={{ fontFamily: "Gapyeong Hanseokbong" }}
          >
            판결문
          </h2>

          {/* 판결문 본문 (배경 / A입장 / B입장 문장) */}
          <p
            className="absolute top-[150px] left-1/2 -translate-x-1/2 w-[420px] text-[#EBAD27] text-[13px] font-normal leading-[150%] text-center"
            style={{ fontFamily: "Gapyeong Hanseokbong" }}
          >
            배경: 어쩌고저쩌고
            <br />
            A입장: 어쩌고저쩌고
            <br />
            B입장: 어쩌고저쩌고
          </p>

          {/* 본문 상세 판단 부분 */}
          <p
            className="absolute top-[249px] left-1/2 -translate-x-1/2 w-[420px] text-[#EBAD27] text-[15px] font-normal leading-[150%] text-center"
            style={{ fontFamily: "Gapyeong Hanseokbong" }}
          >
            A입장의 어쩌고 저쩌고 근거가 더 배경설명과 주제를 납득 어쩌고 저쩌고
            <br />
            B입장의 해당 근거는 어쩌고저쩌고이지만 어쩌고 저쩌고 해서 A가 더
            어쩌고 저쩌고 해서
            <br />
            어쩌고 저쩌고 해서 어쩌고 저쩌고 해서 어쩌고 저쩌고 해서 어쩌고
            저쩌고 해서
          </p>

          {/* 본문  AI 판사의 최종 판결 */}
          <p
            className="absolute top-[403px] left-1/2 -translate-x-1/2 w-[420px] text-[#EBAD27] text-[15px] font-bold leading-[150%] text-center"
            style={{ fontFamily: "Gapyeong Hanseokbong" }}
          >
            A입장 논리의 승리! B입장은 불복할 시 재심을 청구할 수 있음
          </p>
        </div>
      </div>

      {/* 하단 말풍선 */}
      <div className="mt-[60px] flex justify-center">
        <div className="relative w-[960px] h-[94px] bg-[#EAF1FD] rounded-[15px] flex justify-center items-center px-[32px] text-center shadow-sm">
          <p
            className="text-[#203C77] text-[20px] font-normal leading-[150%]"
            style={{
              fontFamily: "Pretendard",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            A 입장의 근거가 B 입장의 근거에 비해 n%정도 더 논리적이었어요!
          </p>

          {/* 꼬리 */}
          <div
            className="absolute left-[-28px] top-1/2 -translate-y-1/2 w-0 h-0 
                 border-t-[16px] border-t-transparent 
                 border-b-[16px] border-b-transparent 
                 border-r-[28px] border-r-[#EAF1FD]"
          ></div>
        </div>
      </div>

      {/* 파란/빨간 바 */}
      <div className="mt-[43px] flex justify-center">
        <div className="relative w-[995px] h-[44px] bg-[rgba(235,146,146,0.46)] rounded-[30px] overflow-hidden flex items-center justify-between px-[20px]">
          <div
            className="absolute left-0 top-0 h-full bg-[#809AD2] rounded-[30px]"
            style={{ width: "60%" }}
          ></div>

          <div className="relative z-10 flex w-full justify-between items-center px-[20px]">
            <p
              className="text-white text-[16px] font-bold leading-[150%]"
              style={{ fontFamily: "Pretendard" }}
            >
              A입장 n%
            </p>
            <p
              className="text-white text-[16px] font-bold leading-[150%]"
              style={{ fontFamily: "Pretendard" }}
            >
              B입장 n%
            </p>
          </div>
        </div>
      </div>

      {/* 하단 버튼 2개 */}
      <div className="mt-[84px] flex justify-center gap-[32px]">
        <Button variant="secondary" className="w-[380px] h-[123px]">
          <span className="text-white text-[36px] font-bold leading-normal">
            여기서 마치기
          </span>
        </Button>

        <Button variant="trialStart" className="w-[380px] h-[123px]">
          <span className="text-white text-[36px] font-bold leading-normal">
            재심 신청하기
          </span>
        </Button>
      </div>
    </div>
  );
}
