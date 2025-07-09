import { useState } from "react";
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
  });

  const [currentLocation, setCurrentLocation] = useState("home");

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

  const renderLocationContent = () => {
    switch (currentLocation) {
      case "home":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-anime-purple">🏠 Мой дом</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-anime-pink/20">
                <CardHeader>
                  <CardTitle className="text-anime-pink">Отдых</CardTitle>
                  <CardDescription>Восстанови энергию</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() =>
                      setPlayerStats((prev) => ({
                        ...prev,
                        energy: Math.min(100, prev.energy + 30),
                      }))
                    }
                    className="w-full bg-anime-pink hover:bg-anime-pink/90"
                  >
                    Отдохнуть (+30 энергии)
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-anime-blue/20">
                <CardHeader>
                  <CardTitle className="text-anime-blue">Развлечения</CardTitle>
                  <CardDescription>Повысь настроение</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() =>
                      setPlayerStats((prev) => ({
                        ...prev,
                        happiness: Math.min(100, prev.happiness + 20),
                      }))
                    }
                    className="w-full bg-anime-blue hover:bg-anime-blue/90"
                  >
                    Посмотреть аниме (+20 счастья)
                  </Button>
                </CardContent>
              </Card>
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
                onClick={() => setCurrentLocation(location.id)}
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
