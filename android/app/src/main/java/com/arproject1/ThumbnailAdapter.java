package com.arproject1;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import java.util.ArrayList;

public class ThumbnailAdapter extends RecyclerView.Adapter<ThumbnailAdapter.ThumbnailViewHolder> {

    private ArrayList<String> thumbnailUrls;
    private OnItemClickListener listener;

    public ThumbnailAdapter(ArrayList<String> thumbnailUrls, OnItemClickListener listener) {
        this.thumbnailUrls = thumbnailUrls;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ThumbnailViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_thumbnail, parent, false);
        return new ThumbnailViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ThumbnailViewHolder holder, int position) {
        String thumbnailUrl = thumbnailUrls.get(position);
        Glide.with(holder.itemView.getContext()).load(thumbnailUrl).into(holder.thumbnailImageView);
    }

    @Override
    public int getItemCount() {
        return thumbnailUrls.size();
    }

    public class ThumbnailViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        ImageView thumbnailImageView;

        public ThumbnailViewHolder(@NonNull View itemView) {
            super(itemView);
            thumbnailImageView = itemView.findViewById(R.id.thumbnailImageView);
            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View v) {
            int position = getAdapterPosition();
            if (position != RecyclerView.NO_POSITION) {
                listener.onItemClick(position);
            }
        }
    }

    public interface OnItemClickListener {
        void onItemClick(int position);
    }
}


