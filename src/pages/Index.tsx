import { useEffect, useState } from "react";
import { Music, Briefcase, Palette, Heart, Utensils, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import CategoryButton from "@/components/CategoryButton";
import { supabase } from "../supabaseClient";

type Event = {
  id: string;
  title: string;
  event_date: string;
  address: string;
  district: string | null;
  category: string | null;
  main_image_url: string | null;
  price: string | null;
};

const categories = [
  { icon: Sparkles, label: "Усі" },
  { icon: Music, label: "Музика" },
  { icon: Briefcase, label: "Бізнес" },
  { icon: Palette, label: "Мистецтво" },
  { icon: Heart, label: "Здоров'я" },
  { icon: Utensils, label: "Їжа" },
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("Усі");
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, title, event_date, address, district, category_id, main_image_url, price")
        .order("event_date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        // якщо категорії в таблиці categories
        const eventsWithCategory = await Promise.all(
          data.map(async (event: any) => {
            if (event.category_id) {
              const { data: catData } = await supabase
                .from("categories")
                .select("name")
                .eq("id", event.category_id)
                .single();
              event.category = catData?.name || "Без категорії";
            } else {
              event.category = "Без категорії";
            }
            return event;
          })
        );
        setEvents(eventsWithCategory);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents =
    activeCategory === "Усі"
      ? events
      : events.filter((event) => event.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Популярні події
            </h2>
            <p className="mt-3 text-muted-foreground">
              Обирайте з найкращих подій у вашому регіоні
            </p>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <CategoryButton
                key={cat.label}
                icon={cat.icon}
                label={cat.label}
                isActive={activeCategory === cat.label}
                onClick={() => setActiveCategory(cat.label)}
              />
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EventCard
                  title={event.title}
                  date={event.event_date}
                  location={event.address}
                  attendees={0} // можна додати поле attendees в таблицю, якщо треба
                  category={event.category || ""}
                  imageUrl={event.main_image_url || ""}
                  price={event.price || "Безкоштовно"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card py-12">
        <div className="container text-center">
          <div className="font-display text-xl font-bold text-foreground">
            EventHub
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            © 2026 EventHub. Усі права захищено.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
