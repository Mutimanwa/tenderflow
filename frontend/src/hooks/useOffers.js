import { useEffect, useState, useCallback } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function useOffers() {
  const { token } = useAuth();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOffers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getOffers();
      // Expecting an array from the API
      setOffers(Array.isArray(data) ? data : (data.offers || []));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOffer = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const created = await api.createOffer(payload, token);
      // Prepend created offer when available
      setOffers((prev) => (created ? [created, ...prev] : prev));
      return created;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const updateOffer = useCallback(async (id, payload) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await api.updateOffer(id, payload, token);
      setOffers((prev) => prev.map((o) => (o._id === id || o.id === id ? updated : o)));
      return updated;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const removeOffer = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.deleteOffer(id, token);
      setOffers((prev) => prev.filter((o) => !(o._id === id || o.id === id)));
      return true;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  return {
    offers,
    loading,
    error,
    fetchOffers,
    createOffer,
    updateOffer,
    removeOffer,
  };
}
