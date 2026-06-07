plugins {
}

    android {
    namespace = "com.example.firstflutterapp"

    defaultConfig {
      applicationId = "com.example.firstflutterapp"
    minSdk = 36
    targetSdk = 36
    versionCode = 1
    versionName = "1.0"

      testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
       release {
           isMinifyEnabled = false
           proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
       }
    }
    }

  dependencies {
  }