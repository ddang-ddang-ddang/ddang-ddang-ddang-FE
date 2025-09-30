import Button from '@/components/common/Button';

export default function Main() {
  return (
  <div>
    <div className="text-yellow-400">Main 페이지입니다.</div>
    <Button variant="primary" onClick={() => alert('버튼 클릭!')}>primary 버튼</Button>
    <Button variant="secondary" onClick={() => alert('버튼 클릭!')}>secondary 버튼</Button>
  </div>);
}