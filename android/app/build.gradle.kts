plugins {
    id("com.android.application")
    id("kotlin-android")
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
    // Firebase
    id("com.google.gms.google-services")
    // Chaquopy Python Support
    id("com.chaquo.python")
}

android {
    namespace = "bebo.studios2"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }

    defaultConfig {
        // Your unique Application ID
        applicationId = "bebo.studios2"

        // --- UPDATED FOR FLUTTER MIN SDK ---
        // Minimum SDK bumped to 24 as required by the url_launcher library
        minSdk = 24

        targetSdk = flutter.targetSdkVersion
        versionCode = flutter.versionCode
        versionName = flutter.versionName

        // Chaquopy ABI configuration
        ndk {
            abiFilters.addAll(setOf("armeabi-v7a", "arm64-v8a", "x86", "x86_64"))
        }
    }

    signingConfigs {
        create("release") {
            keyAlias = "release"
            keyPassword = "android"
            storeFile = file("release.keystore")
            storePassword = "android"
        }
    }

    buildTypes {
        release {
            signingConfig = signingConfigs.getByName("release")
        }
    }
}

chaquopy {
    defaultConfig {
        version = "3.10"
    }
}

flutter {
    source = "../.."
}

dependencies {
    // Standard implementation can be added here if needed
}
