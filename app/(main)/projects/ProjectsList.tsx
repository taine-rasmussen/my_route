import { getFromSecureStore } from '@/app/utils';
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

type Project = {
  id: number;
  is_active: boolean;
  created_at: string;
  total_moves: number;
  total_moves_completed: number;
  notes: string[];
};

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await getFromSecureStore('access_token');
      if (!token) throw new Error('No access token found');

      const resp = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}projects/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!resp.ok) {
        throw new Error(`Server error: ${resp.status}`);
      }

      const data: Project[] = await resp.json();
      setProjects(data);
    } catch (e: any) {
      console.error('Failed to fetch projects', e);
      setError(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={projects}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>
            Project #{item.id} — {item.is_active ? 'Active' : 'Inactive'}
          </Text>
          <Text>
            Moves: {item.total_moves_completed}/{item.total_moves}
          </Text>
          {item.notes.length > 0 && (
            <View style={styles.notes}>
              {item.notes.map((n, i) => (
                <Text key={i} style={styles.noteItem}>
                  • {n}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
  notes: {
    marginTop: 8,
  },
  noteItem: {
    fontSize: 14,
    lineHeight: 20,
  },
  errorText: {
    color: 'red',
  },
});

export default ProjectsList;
