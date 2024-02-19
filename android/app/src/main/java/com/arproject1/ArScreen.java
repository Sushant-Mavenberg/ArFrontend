package com.arproject1;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.ar.sceneform.ux.ArFragment;

import java.util.ArrayList;

public class ArScreen extends AppCompatActivity implements ThumbnailAdapter.OnItemClickListener {

    ArFragment arFragment;
    RecyclerView recyclerView;
    ThumbnailAdapter adapter;
    ArrayList<String> thumbnailUrls;
    ArrayList<String> glbUrls;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Set company logo image
        ImageView logoImageView = findViewById(R.id.logoImageView);
        logoImageView.setImageResource(R.drawable.company_logo);

        // Set up the Toolbar
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayShowTitleEnabled(false);

        // Retrieve GLB URLs from intent
        Intent intent = getIntent();
        thumbnailUrls = new ArrayList<>();
        glbUrls = new ArrayList<>();
        ArrayList<ARData> arDataList = intent.getParcelableArrayListExtra("arDataList");
        if (arDataList != null) {
            for (ARData arData : arDataList) {
                thumbnailUrls.add(arData.getJpegUrl());
                glbUrls.add(arData.getGlbUrl());
            }
        }

        // Check for null or empty thumbnail URLs
        if (thumbnailUrls == null || thumbnailUrls.isEmpty()) {
            // Handle the case where thumbnailUrls is null or empty
            // For example, display a message to the user or take appropriate action
            return;
        }


        // Set up RecyclerView for thumbnails
        recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
        adapter = new ThumbnailAdapter(thumbnailUrls, this);
        recyclerView.setAdapter(adapter);


    }

    @Override
    public void onItemClick(int position) {
        // Handle thumbnail click event
        String glbUrl = glbUrls.get(position);

        // Load the GLB model from the provided URL
        arFragment = (ArFragment) getSupportFragmentManager().findFragmentById(R.id.arFragment);
        arFragment.setOnTapPlaneGlbModel(glbUrl);
    }
}