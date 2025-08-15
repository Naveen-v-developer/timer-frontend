import alarmSound from "../assets/alarm1.wav"; 

let alarmRef = { current: null };


export function playAlarm(loop = false) {
  if (alarmRef.current) {
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
  }

  alarmRef.current = new Audio(alarmSound);
  alarmRef.current.loop = loop;
  alarmRef.current.play().catch((err) =>
    console.error("❌ Alarm error:", err)
  );
}


export function stopAlarm() {
  if (alarmRef.current) {
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
    alarmRef.current = null;
  }
}
