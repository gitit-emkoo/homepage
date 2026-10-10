"use client";

import { useRef, useState } from "react";

export type GuideVideo = { kind: "mp4"; src: string } | { kind: "youtube"; id: string };

type Props = {
  video: GuideVideo;
  title: string;
  className?: string;
};

/** "동영상으로 보기 >" 를 누르면 영상 팝업(<dialog>)을 연다. 영상은 열려 있을 때만 붙여서 닫으면 재생도 멈춘다. */
export default function VideoButton({ video, title, className }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button type="button" className={className} onClick={show}>
        동영상으로 보기 &gt;
      </button>
      <dialog
        ref={dialogRef}
        className="video-dialog"
        aria-label={title}
        onClick={(event) => event.target === event.currentTarget && dialogRef.current?.close()}
        onClose={() => setOpen(false)}
      >
        <div className="video-dialog__body">
          <button type="button" className="video-dialog__close" aria-label="닫기" onClick={() => dialogRef.current?.close()}>
            ×
          </button>
          {open &&
            (video.kind === "mp4" ? (
              <video className="video-dialog__media" src={video.src} controls autoPlay playsInline />
            ) : (
              <iframe
                className="video-dialog__media"
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ))}
        </div>
      </dialog>
    </>
  );
}
