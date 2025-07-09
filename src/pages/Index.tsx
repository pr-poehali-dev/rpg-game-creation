import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [playerStats, setPlayerStats] = useState({
    name: "Аки",
    level: 1,
    money: 5000,
    energy: 75,
    happiness: 65,
    charisma: 45,
    business: 30,
    experience: 250,
    nextLevelExp: 500,
    time: "14:30",
    day: 1,
  });

  const [currentLocation, setCurrentLocation] = useState("home");
  const [currentSubLocation, setCurrentSubLocation] = useState("");
  const [isMoving, setIsMoving] = useState(false);
  const [movingText, setMovingText] = useState("");

  // Время передвижения для анимации
  const moveToLocation = (
    location: string,
    subLocation: string = "",
    walkTime: number = 2,
  ) => {
    setIsMoving(true);
    setMovingText(`Идёшь... ${walkTime} мин`);

    setTimeout(() => {
      setCurrentLocation(location);
      setCurrentSubLocation(subLocation);
      setIsMoving(false);
      setMovingText("");
      // Обновляем время
      const [hours, minutes] = playerStats.time.split(":").map(Number);
      const newMinutes = minutes + walkTime;
      const newTime = `${hours + Math.floor(newMinutes / 60)}:${(newMinutes % 60).toString().padStart(2, "0")}`;
      setPlayerStats((prev) => ({ ...prev, time: newTime }));
    }, walkTime * 500); // Реальное время анимации
  };

  const locations = [
    {
      id: "home",
      name: "Дом",
      icon: "Home",
      description: "Отдохни и восстанови силы",
    },
    {
      id: "work",
      name: "Работа",
      icon: "Briefcase",
      description: "Заработай деньги",
    },
    {
      id: "shop",
      name: "Магазин",
      icon: "ShoppingCart",
      description: "Покупай нужные вещи",
    },
    {
      id: "street",
      name: "Улица",
      icon: "MapPin",
      description: "Знакомься с людьми",
    },
    {
      id: "business",
      name: "Бизнес",
      icon: "TrendingUp",
      description: "Создай свой бизнес",
    },
  ];

  const homeSubLocations = [
    {
      id: "corridor",
      name: "Коридор",
      description: "Входная зона дома",
      image: "/img/57bdd7f7-bd08-4002-9f9c-d3e2c2b77ce7.jpg",
    },
    {
      id: "kitchen",
      name: "Кухня",
      description: "Готовь и ешь",
      image: "/img/69c8e4ab-e972-4a57-8842-5fba642643c3.jpg",
    },
    {
      id: "bedroom",
      name: "Спальня",
      description: "Отдыхай и спи",
      image: "/img/0532782f-80cd-4274-be6e-d3e57a6fece7.jpg",
    },
    {
      id: "bathroom",
      name: "Ванная",
      description: "Умывайся и расслабляйся",
      image: "/img/a4257fac-f0b3-4092-b600-003b9f83efc6.jpg",
    },
  ];

  const jobs = [
    { id: "cafe", name: "Кафе", pay: 500, time: "2 часа", energy: -20 },
    { id: "office", name: "Офис", pay: 800, time: "4 часа", energy: -30 },
    { id: "delivery", name: "Доставка", pay: 600, time: "3 часа", energy: -25 },
  ];

  const shops = [
    { id: "food", name: "Еда", price: 200, effect: "+20 энергии" },
    { id: "clothes", name: "Одежда", price: 1000, effect: "+5 харизмы" },
    { id: "car", name: "Машина", price: 25000, effect: "+10 статуса" },
  ];

  const handleWork = (job: any) => {
    setPlayerStats((prev) => ({
      ...prev,
      money: prev.money + job.pay,
      energy: Math.max(0, prev.energy + job.energy),
      experience: prev.experience + 50,
    }));
  };

  const handlePurchase = (item: any) => {
    if (playerStats.money >= item.price) {
      setPlayerStats((prev) => ({
        ...prev,
        money: prev.money - item.price,
        energy:
          item.id === "food" ? Math.min(100, prev.energy + 20) : prev.energy,
        charisma: item.id === "clothes" ? prev.charisma + 5 : prev.charisma,
      }));
    }
  };

  const renderHomeSubLocation = () => {
    const currentSub = homeSubLocations.find(
      (sub) => sub.id === currentSubLocation,
    );

    if (!currentSub) return null;

    return (
      <div className="space-y-6">
        {/* Визуальная сцена */}
        <div className="relative">
          <img
            src={currentSub.image}
            alt={currentSub.name}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg">
            <h3 className="text-xl font-bold">{currentSub.name}</h3>
            <p className="text-sm opacity-90">{currentSub.description}</p>
          </div>
        </div>

        {/* Действия в зависимости от комнаты */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentSubLocation === "corridor" && (
            <>
              <Button
                onClick={() => moveToLocation("street", "", 1)}
                className="h-20 bg-anime-blue hover:bg-anime-blue/90 flex flex-col items-center justify-center"
              >
                <Icon name="DoorOpen" size={24} />
                <span>Выйти на улицу</span>
              </Button>
              <Button
                onClick={() => setCurrentSubLocation("kitchen")}
                className="h-20 bg-anime-pink hover:bg-anime-pink/90 flex flex-col items-center justify-center"
              >
                <Icon name="ChefHat" size={24} />
                <span>Пойти на кухню</span>
              </Button>
              <Button
                onClick={() => setCurrentSubLocation("bedroom")}
                className="h-20 bg-anime-yellow hover:bg-anime-yellow/90 flex flex-col items-center justify-center text-white"
              >
                <Icon name="Bed" size={24} />
                <span>Пойти в спальню</span>
              </Button>
            </>
          )}

          {currentSubLocation === "kitchen" && (
            <>
              <Button
                onClick={() => setCurrentSubLocation("corridor")}
                className="h-20 bg-gray-500 hover:bg-gray-600 flex flex-col items-center justify-center"
              >
                <Icon name="ArrowLeft" size={24} />
                <span>Назад в коридор</span>
              </Button>
              <Button
                onClick={() =>
                  setPlayerStats((prev) => ({
                    ...prev,
                    energy: Math.min(100, prev.energy + 30),
                    happiness: Math.min(100, prev.happiness + 10),
                  }))
                }
                className="h-20 bg-anime-pink hover:bg-anime-pink/90 flex flex-col items-center justify-center"
              >
                <Icon name="UtensilsCrossed" size={24} />
                <span>Покушать (+30 энергии)</span>
              </Button>
              <Button
                onClick={() =>
                  setPlayerStats((prev) => ({
                    ...prev,
                    energy: Math.max(0, prev.energy - 10),
                    happiness: Math.min(100, prev.happiness + 15),
                  }))
                }
                className="h-20 bg-anime-blue hover:bg-anime-blue/90 flex flex-col items-center justify-center"
              >
                <Icon name="ChefHat" size={24} />
                <span>Готовить (+15 счастья)</span>
              </Button>
            </>
          )}

          {currentSubLocation === "bedroom" && (
            <>
              <Button
                onClick={() => setCurrentSubLocation("corridor")}
                className="h-20 bg-gray-500 hover:bg-gray-600 flex flex-col items-center justify-center"
              >
                <Icon name="ArrowLeft" size={24} />
                <span>Назад в коридор</span>
              </Button>
              <Button
                onClick={() =>
                  setPlayerStats((prev) => ({
                    ...prev,
                    energy: Math.min(100, prev.energy + 50),
                    happiness: Math.min(100, prev.happiness + 20),
                  }))
                }
                className="h-20 bg-anime-purple hover:bg-anime-purple/90 flex flex-col items-center justify-center"
              >
                <Icon name="Moon" size={24} />
                <span>Спать (+50 энергии)</span>
              </Button>
              <Button
                onClick={() =>
                  setPlayerStats((prev) => ({
                    ...prev,
                    happiness: Math.min(100, prev.happiness + 25),
                    charisma: prev.charisma + 1,
                  }))
                }
                className="h-20 bg-anime-pink hover:bg-anime-pink/90 flex flex-col items-center justify-center"
              >
                <Icon name="Monitor" size={24} />
                <span>Смотреть аниме (+25 счастья)</span>
              </Button>
            </>
          )}

          {currentSubLocation === "bathroom" && (
            <>
              <Button
                onClick={() => setCurrentSubLocation("corridor")}
                className="h-20 bg-gray-500 hover:bg-gray-600 flex flex-col items-center justify-center"
              >
                <Icon name="ArrowLeft" size={24} />
                <span>Назад в коридор</span>
              </Button>
              <Button
                onClick={() =>
                  setPlayerStats((prev) => ({
                    ...prev,
                    energy: Math.min(100, prev.energy + 20),
                    happiness: Math.min(100, prev.happiness + 30),
                  }))
                }
                className="h-20 bg-anime-blue hover:bg-anime-blue/90 flex flex-col items-center justify-center"
              >
                <Icon name="Droplets" size={24} />
                <span>Принять душ (+20 энергии)</span>
              </Button>
              <Button
                onClick={() =>
                  setPlayerStats((prev) => ({
                    ...prev,
                    charisma: prev.charisma + 3,
                    happiness: Math.min(100, prev.happiness + 15),
                  }))
                }
                className="h-20 bg-anime-pink hover:bg-anime-pink/90 flex flex-col items-center justify-center"
              >
                <Icon name="Sparkles" size={24} />
                <span>Ухаживать за собой (+3 харизмы)</span>
              </Button>
            </>
          )}
        </div>

        {/* Дополнительные комнаты */}
        {currentSubLocation === "corridor" && (
          <Card className="border-anime-purple/20 mt-4">
            <CardHeader>
              <CardTitle className="text-anime-purple">
                Другие комнаты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  onClick={() => setCurrentSubLocation("bathroom")}
                  variant="outline"
                  className="border-anime-blue text-anime-blue hover:bg-anime-blue/10"
                >
                  <Icon name="Bath" size={16} className="mr-2" />
                  Ванная
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderLocationContent = () => {
    // Если дома и выбрана подлокация
    if (currentLocation === "home" && currentSubLocation) {
      return renderHomeSubLocation();
    }

    switch (currentLocation) {
      case "home":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-anime-purple">
              🏠 Выбери комнату
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {homeSubLocations.map((subLocation) => (
                <Card
                  key={subLocation.id}
                  className="border-anime-pink/20 hover:border-anime-pink/40 transition-all cursor-pointer"
                >
                  <div onClick={() => setCurrentSubLocation(subLocation.id)}>
                    <div className="h-32 bg-gradient-to-br from-anime-pink/20 to-anime-blue/20 rounded-t-lg flex items-center justify-center">
                      <Icon
                        name={
                          subLocation.id === "corridor"
                            ? "Home"
                            : subLocation.id === "kitchen"
                              ? "ChefHat"
                              : subLocation.id === "bedroom"
                                ? "Bed"
                                : "Bath"
                        }
                        size={48}
                        className="text-anime-purple"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-anime-purple">
                        {subLocation.name}
                      </CardTitle>
                      <CardDescription>
                        {subLocation.description}
                      </CardDescription>
                    </CardHeader>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case "work":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-anime-purple">💼 Работа</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <Card key={job.id} className="border-anime-yellow/20">
                  <CardHeader>
                    <CardTitle className="text-anime-yellow">
                      {job.name}
                    </CardTitle>
                    <CardDescription>Время: {job.time}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-green-600">+{job.pay}¥</p>
                      <p className="text-red-500">{job.energy} энергии</p>
                      <Button
                        onClick={() => handleWork(job)}
                        disabled={playerStats.energy < Math.abs(job.energy)}
                        className="w-full bg-anime-yellow hover:bg-anime-yellow/90 text-white"
                      >
                        Работать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "shop":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-anime-purple">🛍️ Магазин</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {shops.map((item) => (
                <Card key={item.id} className="border-anime-pink/20">
                  <CardHeader>
                    <CardTitle className="text-anime-pink">
                      {item.name}
                    </CardTitle>
                    <CardDescription>{item.effect}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-red-600">{item.price}¥</p>
                      <Button
                        onClick={() => handlePurchase(item)}
                        disabled={playerStats.money < item.price}
                        className="w-full bg-anime-pink hover:bg-anime-pink/90"
                      >
                        Купить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "street":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-anime-purple">🚶 Улица</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-anime-blue/20">
                <CardHeader>
                  <CardTitle className="text-anime-blue">Знакомства</CardTitle>
                  <CardDescription>Найди новых друзей</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() =>
                      setPlayerStats((prev) => ({
                        ...prev,
                        charisma: prev.charisma + 2,
                        happiness: prev.happiness + 10,
                      }))
                    }
                    className="w-full bg-anime-blue hover:bg-anime-blue/90"
                  >
                    Познакомиться (+2 харизмы)
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-anime-pink/20">
                <CardHeader>
                  <CardTitle className="text-anime-pink">Флирт</CardTitle>
                  <CardDescription>Улучши отношения</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() =>
                      setPlayerStats((prev) => ({
                        ...prev,
                        charisma: prev.charisma + 3,
                        happiness: prev.happiness + 15,
                      }))
                    }
                    disabled={playerStats.charisma < 20}
                    className="w-full bg-anime-pink hover:bg-anime-pink/90"
                  >
                    Флиртовать (нужно 20 харизмы)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "business":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-anime-purple">📈 Бизнес</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-anime-yellow/20">
                <CardHeader>
                  <CardTitle className="text-anime-yellow">
                    Создать бизнес
                  </CardTitle>
                  <CardDescription>Начни свое дело</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() =>
                      setPlayerStats((prev) => ({
                        ...prev,
                        money: prev.money - 10000,
                        business: prev.business + 20,
                      }))
                    }
                    disabled={playerStats.money < 10000}
                    className="w-full bg-anime-yellow hover:bg-anime-yellow/90 text-white"
                  >
                    Открыть кафе (10000¥)
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-anime-blue/20">
                <CardHeader>
                  <CardTitle className="text-anime-blue">Инвестиции</CardTitle>
                  <CardDescription>Вложи и получи прибыль</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() =>
                      setPlayerStats((prev) => ({
                        ...prev,
                        money:
                          prev.money + Math.floor(Math.random() * 2000) + 500,
                      }))
                    }
                    disabled={playerStats.money < 5000}
                    className="w-full bg-anime-blue hover:bg-anime-blue/90"
                  >
                    Инвестировать (5000¥)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isMoving) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-anime-pink/10 via-anime-blue/10 to-anime-yellow/10 flex items-center justify-center">
        <Card className="bg-white/90 backdrop-blur-sm border-anime-purple/20 shadow-lg p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-anime-purple border-t-transparent mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-anime-purple mb-2">
              {movingText}
            </h2>
            <p className="text-anime-purple/60">Перемещаюсь...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-pink/10 via-anime-blue/10 to-anime-yellow/10">
      <div className="container mx-auto p-4">
        {/* Header with Character Stats */}
        <div className="mb-6">
          <Card className="bg-white/90 backdrop-blur-sm border-anime-purple/20 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20 border-4 border-anime-pink">
                  <AvatarImage
                    src="/img/601745cd-a16b-4f7a-9944-9ebb68552257.jpg"
                    alt="Character"
                  />
                  <AvatarFallback className="bg-anime-pink text-white text-2xl">
                    Аки
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h1 className="text-3xl font-bold text-anime-purple">
                      {playerStats.name}
                    </h1>
                    <Badge
                      variant="secondary"
                      className="bg-anime-yellow text-white"
                    >
                      Уровень {playerStats.level}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-anime-blue text-anime-blue"
                    >
                      {playerStats.time} | День {playerStats.day}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-lg">
                    <div className="flex items-center space-x-1">
                      <Icon name="Coins" className="text-anime-yellow" />
                      <span className="font-semibold">
                        {playerStats.money}¥
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Zap" className="text-anime-blue" />
                      <span>{playerStats.energy}/100</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" className="text-anime-pink" />
                      <span>{playerStats.happiness}/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-anime-blue">Энергия</span>
                    <span className="text-sm">{playerStats.energy}/100</span>
                  </div>
                  <Progress value={playerStats.energy} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-anime-pink">Счастье</span>
                    <span className="text-sm">{playerStats.happiness}/100</span>
                  </div>
                  <Progress value={playerStats.happiness} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-anime-yellow">Харизма</span>
                    <span className="text-sm">{playerStats.charisma}/100</span>
                  </div>
                  <Progress value={playerStats.charisma} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-anime-purple">Бизнес</span>
                    <span className="text-sm">{playerStats.business}/100</span>
                  </div>
                  <Progress value={playerStats.business} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <Button
                key={location.id}
                variant={
                  currentLocation === location.id ? "default" : "outline"
                }
                onClick={() =>
                  moveToLocation(
                    location.id,
                    "",
                    location.id === "home" ? 1 : 5,
                  )
                }
                className={`flex items-center space-x-2 ${
                  currentLocation === location.id
                    ? "bg-anime-purple text-white"
                    : "border-anime-purple/30 text-anime-purple hover:bg-anime-purple/10"
                }`}
              >
                <Icon name={location.icon as any} size={16} />
                <span>{location.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-6">
          <Card className="bg-white/90 backdrop-blur-sm border-anime-purple/20 shadow-lg">
            <CardContent className="p-6">{renderLocationContent()}</CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-anime-purple/60">
          <p>🎮 RPG Life Sim - Создай свою жизнь! 🚀</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
