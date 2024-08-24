import {
  Course,
  DaleyRecommendation,
  Recommendation,
  Wallet,
} from "@prisma/client";
import axios from "axios";

export const getCourse = async (id: string): Promise<Course | null> => {
  try {
    const response = await axios.get(`/api/courses/${id}`);

    const course: Course = response.data;

    if (!course) {
      return null;
    }

    return course;
  } catch (error) {
    return null;
  }
};

export const getWallet = async (id: string): Promise<Wallet | null> => {
  try {
    const response = await axios.get(`/api/wallet/${id}`);

    const wallet: Wallet = response.data;

    if (!wallet) {
      return null;
    }

    return wallet;
  } catch (error) {
    return null;
  }
};

export const getRecommendation = async (
  id: string
): Promise<Recommendation | null> => {
  try {
    const response = await axios.get(`/api/recommendations/${id}`);

    const recommendation: Recommendation = response.data;

    if (!recommendation) {
      return null;
    }

    return recommendation;
  } catch (error) {
    return null;
  }
};

export const getDailyRecommendation = async (
  id: string
): Promise<DaleyRecommendation | null> => {
  try {
    const response = await axios.get(`/api/daily-recommendations/${id}`);

    const recommendation: DaleyRecommendation = response.data;

    if (!recommendation) {
      return null;
    }

    return recommendation;
  } catch (error) {
    return null;
  }
};
