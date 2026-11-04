import ChatTitle from "@/components/ChatTitle";
import EventVisual from "@/components/EventVisual";

export default function LaunchEvent() {
  return (
    <section className="event">
      <div className="event__inner">
        <ChatTitle>
          받을수 있는 혜택들
          <br />
          떠먹여 드릴게요!
        </ChatTitle>
        <EventVisual />
      </div>
    </section>
  );
}
