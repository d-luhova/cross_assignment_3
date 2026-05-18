ДЗ Тема 9.

Додано глобальне керування станом за допомогою Context API (перемикання світлої/темної теми через ThemeContext) та Redux Toolkit (керування списком бронювань із можливістю додавання, видалення та отримання даних з API).

<img width="591" height="1280" alt="image" src="https://github.com/user-attachments/assets/b9940c01-c93a-4599-86e4-0511c9b1bbed" />

ДЗ Тема 11.

React.memo використаний для компонентів CardRestaurant, DetailsCard, RestaurantImage, щоб уникати їх повторного ререндеру без зміни props. Додатково useCallback застосовано для стабілізації функцій у HomeScreen, DetailsScreen, CardRestaurant та BookingScreen, що зменшило кількість зайвих перерендерів у FlatList і дочірніх компонентах. Також useMemo було використано для оптимізації обчислень (пошук ресторану в DetailsCard та створення restaurantMap в BookingScreen).

У компоненті ThemeToggle реалізовано анімацію за допомогою LayoutAnimation. При натисканні на кнопку плавно змінюються border radius, кольори та іконка теми.

Було замінено `@expo/vector-icons`, який підключає великі набори font-іконок, на `lucide-react-native`, де імпортуються лише конкретні SVG-компоненти. Також було видалено невикористані прямі залежності: `expo-haptics`, `expo-linking`, `expo-web-browser`, `expo-system-ui`, `expo-splash-screen`, `expo-font`, `expo-constants`, `@react-navigation/elements`.
Після змін було виконано перевірку через `source-map-explorer`. JS bundle після переходу на Lucide став більшим, оскільки SVG-іконки входять у JavaScript-код. Проте фінальний export разом з assets зменшився, бо `@expo/vector-icons` додавав великі font-файли іконок.
Загальний розмір JS + assets без sourcemap зменшився з ~6.49 MB до ~3.14 MB. Економія склала приблизно 3.35 MB, або 51.6%. Кількість пакетів у dependency tree зменшилась на 116 пакетів.
