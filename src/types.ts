export interface FabricMetadata {
  gsm: number;
  fabricType: string;
  stretchPercent: number; // e.g. 0% for rigid denim, 25% for jersey
  shrinkagePercent: number; // e.g. 3% after wash
  composition: string; // e.g., "98% Cotton, 2% Elastane"
}

export interface GarmentKeypoint {
  id: string;
  name: string; // e.g., "Chest Width", "Shoulder Seam", "Waist", "Garment Length", "Sleeve Length"
  x1: number; // Percentage on canvas 0-100
  y1: number;
  x2: number;
  y2: number;
  cmValue: number;
  confidence: number;
}

export interface SizeMeasurement {
  chestCm: number;
  shoulderCm: number;
  waistCm: number;
  hipsCm: number;
  lengthCm: number;
  sleeveCm: number;
  stretchToleranceCm: number;
}

export interface DynamicSizeChart {
  category: string; // e.g. "Outerwear", "Tops", "Dresses", "Bottoms", "Ethnic Wear"
  sizes: Record<string, SizeMeasurement>; // S, M, L, XL, XXL
  unit: 'cm' | 'inches';
}

export interface LocalizedSizeChart {
  region: 'US' | 'UK' | 'EU' | 'IN' | 'JP';
  regionName: string;
  sizes: Record<string, {
    localCode: string;
    chestRange: string;
    waistRange: string;
    bodyNote: string;
  }>;
}

export interface TechPackSpec {
  skuId: string;
  title: string;
  brand: string;
  category: string;
  gender: 'Men' | 'Women' | 'Unisex';
  techPackSource: string;
  fabric: FabricMetadata;
  declaredSizeTable: Record<string, SizeMeasurement>;
  historicalReturns: {
    totalOrders: number;
    returnRatePercent: number;
    topReasons: Array<{ reason: string; percentage: number }>;
  };
  sampleImages: {
    front: string;
    back: string;
    flatLay: string;
  };
}

export interface AnomalyAlert {
  id: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  field: string;
  detectedValue: string;
  expectedValue: string;
}

export interface CustomerMeasurementInput {
  heightCm: number;
  weightKg: number;
  chestCm: number;
  waistCm: number;
  hipsCm: number;
  shoulderCm: number;
  preferredFit: 'snug' | 'regular' | 'relaxed' | 'oversized';
  trustedBrand?: {
    brandName: string;
    sizeName: string;
    fitType: string;
  };
}

export interface FitRecommendationResult {
  recommendedSize: string;
  confidenceScore: number; // 0 - 100
  latencyMs: number;
  fitDistribution: Record<string, number>; // Size -> Probability %
  reasoning: string;
  detailedExplanations: Array<{
    bodyPart: string;
    fitStatus: 'perfect' | 'snug' | 'loose' | 'tight_risk';
    diffCm: number;
    note: string;
  }>;
  heatmapPoints: Array<{
    part: 'shoulders' | 'chest' | 'waist' | 'hips' | 'length';
    pressureLevel: 'optimal' | 'moderate' | 'high_tightness' | 'excess_slack';
    label: string;
    x: number; // % coordinates
    y: number;
  }>;
}

export interface DatasetSample {
  id: string;
  name: string;
  source: 'ModCloth' | 'RentTheRunway' | 'DeepFashion2' | 'Cloth3D' | 'VITON-HD' | 'Indian Sizing Consortium';
  recordCount: string;
  description: string;
  keyFeatures: string[];
  sampleRecord: Record<string, any>;
}
