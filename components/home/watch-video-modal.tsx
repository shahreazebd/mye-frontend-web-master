import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function WatchVideoModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="text-[11px] md:text-base">
          Watch Video
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] md:max-w-[550px] lg:max-w-[700px]">
        <iframe
          width="100%"
          src="https://www.youtube.com/embed/3E2pexBp9aQ"
          title="YouTube video player"
          style={{
            position: "relative",
            zIndex: "9999",
            marginTop: "20px",
            height: "50vh",
          }}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </DialogContent>
    </Dialog>
  );
}
