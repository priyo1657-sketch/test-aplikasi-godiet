# 🎯 Komponen Baru GoDiet App

Dokumentasi lengkap komponen UI yang baru ditambahkan untuk aplikasi diet tracking.

## 📦 Komponen yang Tersedia

### 1. **RecipeCard**

Menampilkan kartu resep dengan foto, informasi waktu, kalori, tingkat kesulitan, dan rating.

```typescript
import { RecipeCard } from '../components';

<RecipeCard
  image={require('../assets/recipe.png')}
  title="Avocado Chicken Salad"
  time="20 min"
  calories={485}
  difficulty="easy"
  rating={4.5}
  onPress={() => console.log('pressed')}
/>
```

**Props:**

- `image`: ImageSourcePropType - Gambar resep
- `title`: string - Nama resep
- `time?`: string - Waktu persiapan
- `calories?`: number - Nilai kalori
- `difficulty?`: "easy" | "medium" | "hard"
- `rating?`: number - Rating resep
- `onPress?`: () => void - Callback saat ditekan

---

### 2. **MealItemCard**

Menampilkan item makanan dalam daftar dengan gambar, nama, berat, dan jumlah.

```typescript
import { MealItemCard } from '../components';

<MealItemCard
  image={require('../assets/lettuce.png')}
  name="Lettuce Chopped"
  weight="160 g"
  amount="1 bowl"
/>
```

**Props:**

- `image`: ImageSourcePropType - Gambar makanan
- `name`: string - Nama makanan
- `weight`: string - Berat makanan
- `amount?`: string - Jumlah

---

### 3. **StatsCard**

Menampilkan kartu statistik dengan progress circular, nilai, target, dan persentase.

```typescript
import { StatsCard } from '../components';

<StatsCard
  label="Calories"
  value={1500}
  target={2000}
  unit=" kcal"
  color={Colors.primary}
  size={80}
/>
```

**Props:**

- `label`: string - Label statistik
- `value`: number - Nilai saat ini
- `target`: number - Target nilai
- `unit?`: string - Satuan (default: "")
- `color?`: string - Warna progress (default: primary)
- `size?`: number - Ukuran circle (default: 80)

---

### 4. **ActivityCard**

Menampilkan kartu aktivitas dengan foto, durasi, kalori terbakar, dan intensitas.

```typescript
import { ActivityCard } from '../components';

<ActivityCard
  title="Arms Raises"
  image={require('../assets/activity.png')}
  duration="15 min"
  calories="95 kcal"
  intensity="high"
  onPress={() => console.log('pressed')}
/>
```

**Props:**

- `title`: string - Nama aktivitas
- `image?`: ImageSourcePropType - Gambar aktivitas
- `duration?`: string - Durasi aktivitas
- `calories?`: string - Kalori terbakar
- `intensity?`: "low" | "medium" | "high"
- `onPress?`: () => void - Callback saat ditekan

---

### 5. **ProfileHeader**

Menampilkan header profil dengan avatar, greeting, progress minggu, dan tombol aksi.

```typescript
import { ProfileHeader } from '../components';

<ProfileHeader
  name="Hi, Ari!"
  avatar={require('../assets/avatar.png')}
  weeklyProgress={75}
  onNotificationPress={() => console.log('notifications')}
  onSettingsPress={() => console.log('settings')}
/>
```

**Props:**

- `name`: string - Nama pengguna
- `avatar?`: ImageSourcePropType - Gambar avatar
- `weeklyProgress?`: number - Progress minggu (0-100)
- `onNotificationPress?`: () => void - Callback tombol notifikasi
- `onSettingsPress?`: () => void - Callback tombol settings

---

### 6. **NutritionBadge**

Menampilkan badge informasi nutrisi dengan nilai, unit, dan progress bar opsional.

```typescript
import { NutritionBadge } from '../components';

<NutritionBadge
  label="Protein"
  value={45}
  unit="g"
  percentage={74}
  color={Colors.warning}
/>
```

**Props:**

- `label`: string - Label nutrisi
- `value`: number - Nilai nutrisi
- `unit`: string - Satuan (contoh: "g", "kcal")
- `percentage?`: number - Persentase (0-100)
- `color?`: string - Warna badge (default: primary)

---

### 7. **QuickActionButton**

Menampilkan tombol aksi cepat dengan icon, label, dan badge opsional.

```typescript
import { QuickActionButton } from '../components';

<QuickActionButton
  icon="🍔"
  label="Add Meal"
  badge={3}
  onPress={() => console.log('add meal')}
/>
```

**Props:**

- `icon`: string - Emoji atau icon
- `label`: string - Label tombol
- `onPress?`: () => void - Callback saat ditekan
- `badge?`: number - Angka badge (opsional)

---

## 🎨 Styling & Theme

Semua komponen menggunakan sistem theme yang konsisten:

- **Colors**: Primary green (#2DB34A), supporting colors untuk berbagai status
- **Spacing**: Sistem spacing yang terstruktur (xs, sm, md, lg, xl, xxl)
- **BorderRadius**: Border radius yang konsisten (sm, md, lg, xl, full)
- **Shadows**: Subtle shadows untuk depth

Lihat `src/theme/colors.ts` untuk konfigurasi lengkap.

---

## 💡 Tips Penggunaan

1. **Scroll Container**: Bungkus multiple cards dalam `ScrollView` untuk layout yang scrollable
2. **Spacing**: Gunakan `Spacing.md` untuk margin antar komponen
3. **Colors**: Import `Colors` dari theme untuk konsistensi warna
4. **Images**: Pastikan gambar ada di folder `src/assets` dengan format yang sesuai

---

## 📝 Contoh Implementasi Lengkap

```typescript
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  RecipeCard,
  StatsCard,
  ActivityCard,
  ProfileHeader,
  Spacing,
  Colors,
} from '../components';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <ProfileHeader
        name="Ari"
        weeklyProgress={75}
      />

      <View style={styles.section}>
        <StatsCard
          label="Calories"
          value={1500}
          target={2000}
          unit=" kcal"
        />
        <StatsCard
          label="Steps"
          value={8500}
          target={10000}
          unit=""
        />
      </View>

      <RecipeCard
        image={require('../assets/recipe.png')}
        title="Avocado Chicken Salad"
        time="20 min"
        calories={485}
        difficulty="easy"
        rating={4.5}
      />

      <ActivityCard
        title="Arms Raises"
        duration="15 min"
        calories="95 kcal"
        intensity="high"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray100,
    paddingHorizontal: Spacing.md,
  },
  section: {
    marginVertical: Spacing.md,
  },
});
```

---

Selamat! Komponen-komponen baru sudah siap digunakan dalam aplikasi Anda! 🚀
