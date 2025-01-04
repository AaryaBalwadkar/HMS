import React from "react";
import SidebarButtonsComponent from "./SidebarButtonsComponent";
import { CalendarCheck2, MessageCircleQuestion, Search } from "lucide-react";

const SidebarComponent = () => {
  return (
      <section className="absolute w-[200px] h-[calc(100vh-70px)] border-r-2 hidden md:block">
        <SidebarButtonsComponent
          content="Schedule Appointment"
          logo={<CalendarCheck2 />}
          sectionKey="appointment"
        />
        <SidebarButtonsComponent
          content="Find Hospital"
          logo={<Search />}
          sectionKey="find"
        />
        <SidebarButtonsComponent
          content="Enquire"
          logo={<MessageCircleQuestion />}
          sectionKey="enquire"
        />
      </section>
  );
};

export default SidebarComponent;
